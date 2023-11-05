using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FisicaHuevos : MonoBehaviour
{
    private Collider2D myCollider;
    public float tiempo = 2.0f;


    void Start()
    {
        myCollider = GetComponent<Collider2D>();
        InvokeRepeating(nameof(Desactivar), tiempo, 0f);
    }

    // Update is called once per frame
    void Update()
    {

    }
    private void Desactivar()
    {
        if (myCollider != null)
        {
            myCollider.enabled = false;
        }
        myCollider.enabled = enabled;
    }
}
